import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from '@material-ui/core'
import { Theme, makeStyles, createStyles, lighten } from '@material-ui/core/styles'

export type ColumnsType<RecordType = unknown> = ColumnType<RecordType>[]
type AlignType = 'left' | 'right' | 'center'

interface CellType<RecordType> {
  key?: string | number
  className?: string
  children?: React.ReactNode
  column?: ColumnsType<RecordType>[number]
}

interface RenderedCell<RecordType> {
  props?: CellType<RecordType>
  children?: React.ReactNode
}

interface ColumnType<RecordType> {
  align?: AlignType
  className?: string
  dataIndex: string | number
  key?: string | number
  title?: string
  render?: (value: any, record: RecordType, index: number) => React.ReactNode | RenderedCell<RecordType>
}

interface HeadCell {
  key?: number | string
  label?: string
  align?: AlignType
}

interface CustomTableHeadProps {
  headCells?: HeadCell[]
}

interface TablePaginationOptions {
  count: number
  page?: number
  rowsPerPage: number
  rowsPerPageOptions?: number[]
  hideOnSinglePage?: boolean
  onChangePage: (event: unknown, page: number) => void
  position?: 'right' | 'left' | 'center'
}

interface CustomTableProps<RecordType> {
  dataSource?: RecordType[]
  columns?: ColumnsType<RecordType>
  pagination?: false | TablePaginationOptions
  title?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
  }))

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: '1 1 100%',
    },
  }))

function CustomTableHead(props: CustomTableHeadProps) {
  const { headCells }  = props

  return (
    <TableHead>
      <TableRow>
        {headCells && headCells.map(headCell => (
          <TableCell
            key={headCell.key}
            align={headCell.align}
          >
            {headCell.label || ''}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

function CustomTable<RecordType extends object = any>(props: CustomTableProps<RecordType>): JSX.Element {

  const classes = useStyles()
  const toolbarClasses = useToolbarStyles()
  const { dataSource, columns, pagination = false, title } = props

  const headCells = columns?.map((column): HeadCell => ({
    label: column.title,
    key: column.key,
    align: column.align,
  }))

  const emptyRows = pagination !== false ? pagination.rowsPerPage - (dataSource?.length || 0) : 0

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar className={toolbarClasses.root}>
          <Typography className={toolbarClasses.title} variant="h6" id="tableTitle" component="div">
            {title || ''}
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table className={classes.table}>
            <CustomTableHead 
              headCells={headCells}
            />
            <TableBody>
              {dataSource?.map((data, index) => {
                return (
                  <TableRow
                    hover
                    key={index}
                  >
                    {columns?.map(column => {
                      return (
                        <TableCell
                          align={column.align}
                        >
                          {column.render 
                            ? column.render(data[column.dataIndex as keyof RecordType], data, index) 
                            : data[column.dataIndex as keyof RecordType]
                          }
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination !== false && (pagination.hideOnSinglePage && pagination.count > (pagination.rowsPerPage)) && (
          <TablePagination 
            component="div"
            rowsPerPage={pagination.rowsPerPage}
            rowsPerPageOptions={pagination.rowsPerPageOptions || [pagination.rowsPerPage]}
            count={pagination.count}
            page={typeof pagination.page === 'string' ? parseInt(pagination.page) : (pagination.page || 0)}
            onChangePage={pagination.onChangePage}
          />
        )}
      </Paper>
    </div>
  )
}

export const NekoTable = CustomTable