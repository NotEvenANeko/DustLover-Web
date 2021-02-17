import React from 'react'
import { 
  TableCell, 
  TableHead, 
  TableRow, 
  Checkbox, 
  TableSortLabel, 
  Toolbar, 
  Typography, 
  Paper, 
  TableContainer, 
  Table, 
  TableBody,
  TablePagination
} from '@material-ui/core'
import { Theme, makeStyles, createStyles, lighten } from '@material-ui/core/styles'

function descendingComparator<T>(a: T, b: T, orderby: keyof T) {
  if(b[orderby] < a[orderby]) {
    return -1
  }
  if(b[orderby] > a[orderby]) {
    return 1
  }
  return 0
}

type Order = 'asc'|'desc'

function getComparator<T>(
  order: Order,
  orderBy: keyof T,
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stablilizedThis = array.map((el, index) => [el, index] as [T, number])
  stablilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if(order !== 0) return order
    return a[1] - b[1]
  })
  return stablilizedThis.map((el) => el[0])
}

interface HeadCell<T> {
  id: keyof T
  disablePadding: boolean
  label: string
  numeric: boolean
}

interface EnhancedTableHeadProps<T> {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: keyof T
  rowCount: number
  headCells: HeadCell<T>[]
}

function EnhancedTableHead<T>(props: EnhancedTableHeadProps<T>) {
  const { classes, numSelected, onRequestSort, onSelectAllClick, order, orderBy, rowCount, headCells } = props
  function createSortHandler(property: keyof T) { 
    return (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }}

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox 
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id as string|number}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }))

interface EnhancedTableToolbarProps {
  numSelected: number
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles()
  const { numSelected } = props

  return (
    <Toolbar
      className={`${classes.root} ${numSelected > 0 ? classes.highlight : ''}`}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Users
        </Typography>
      )}
    </Toolbar>
  )
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
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }))

interface PaginationProps {
  onChange: (event: unknown, page: number) => void
  rowsPerPage: number
  page: number
  count: number
}

interface EnhancedTableProps<T> {
  rows: T[]
  defaultOrderBy: keyof T
  selectedBy: keyof T
  labels: Array<keyof T>
  headCells: HeadCell<T>[]
  pagination?: PaginationProps
}

function EnhancedTable<T>(props: EnhancedTableProps<T>) {
  const { rows, defaultOrderBy, selectedBy, headCells, labels, pagination = {
    rowsPerPage: 10,
    page: 0,
    count: 0,
    onChange: (event: unknown, page: number) => {
      
    }
  } } = props
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof T>(defaultOrderBy)
  const [selected, setSelected] = React.useState<T[keyof T][]>([])

  function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof T) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked) {
      const newSelecteds = rows.map(n => n[selectedBy])
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: T[keyof T]) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: T[keyof T][] = []

    if(selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if(selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if(selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if(selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (name: T[keyof T]) => selected.indexOf(name) !== -1

  const emptyRows = pagination.rowsPerPage - rows.length

  const generateCell = (isFirst: boolean, value: T[keyof T], labelId?: string) => {
    if(isFirst) {
      return (
        <TableCell 
          component="th" 
          id={labelId || ''} 
          scope="row" 
          padding="none" 
          align={typeof value === 'number' ? 'right' : 'left'}>
          {value}
        </TableCell>
      )
    } else {
      return (
        <TableCell align={typeof value === 'number' ? 'right' : 'left'}>{value}</TableCell>
      )
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
          >
            <EnhancedTableHead<T>
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row[selectedBy])
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event: React.MouseEvent<unknown>) => handleClick(event, row[selectedBy])}
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox 
                          checked={isItemSelected}
                        />
                      </TableCell>
                      {generateCell(true, row[selectedBy], labelId)}
                      {labels.map(item => generateCell(false, row[item]))}
                    </TableRow>
                  )
                })  
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination 
          component="div"
          rowsPerPageOptions={[10]}
          count={pagination.count}
          rowsPerPage={pagination.rowsPerPage}
          page={typeof pagination.page === 'string' ? parseInt(pagination.page) : pagination.page}
          onChangePage={pagination.onChange}
        />
      </Paper>
    </div>
  )
}

export default EnhancedTable