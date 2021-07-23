// REACT
import React, { useState, useEffect, useContext, useCallback } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import TableContainer from '@material-ui/core/TableContainer'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'
import ProductRow from './components/row'

// ICONS
import FormatColorTextTwoTone from '@material-ui/icons/FormatColorTextTwoTone'
import FingerprintTwoTone from '@material-ui/icons/FingerprintTwoTone'
import LocalOfferTwoTone from '@material-ui/icons/LocalOfferTwoTone'
import SettingsTwoTone from '@material-ui/icons/SettingsTwoTone'
import WidgetsTwoTone from '@material-ui/icons/WidgetsTwoTone'
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone'
import CreateTwoTone from '@material-ui/icons/CreateTwoTone'
import ImageTwoTone from '@material-ui/icons/ImageTwoTone'

// HOOC
import withStrings from 'hoc/lang'

// REACT WINDOW
import { FixedSizeList as List } from 'react-window'

// CONTEXTO
import BusinessContext from 'context/business'

// UTILS
import useProducts from './utils/hooks'

const ProductsList: React.FC = withStrings(({ $ }) => {
  // LISTA DE PRODUCTOS
  const [products, setProducts] = useState<Product[]>([])

  // FILA
  const [currentRow, setCurrentRow] = useState<HTMLElement | null>(null)
  const openRowMenu = Boolean(currentRow)

  // BUSINESS
  const businessCtx = useContext(BusinessContext)

  // ASIGNAR FILA
  const handleRow = (ev: React.MouseEvent<HTMLButtonElement>) => setCurrentRow(ev.currentTarget)

  // CERRAR MENU DE FILA
  const closeRowMenu = () => setCurrentRow(null)

  // FILA
  const row = useCallback(
    ({ index, style }) => {
      const product: Product = products[index]
      return <ProductRow product={product} style={style} handleRow={handleRow} Styles={Styles} />
    },
    [products]
  )

  // OBTENER PRODUCTOS
  useProducts(setProducts, businessCtx.business?.id)

  return (
    <>
      <div className={Styles.container}>
        <TableContainer component={Paper} style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
          <div className={Styles.tableHeader}>
            <strong>
              <ImageTwoTone />
            </strong>
            <strong>
              <FormatColorTextTwoTone />
              {$`Titulo`}
            </strong>
            <strong>
              <FingerprintTwoTone />
              {$`SKU`}
            </strong>
            <strong>
              <WidgetsTwoTone />
              {$`Categoria`}
            </strong>
            <strong>
              <LocalOfferTwoTone />
              {$`Precio`}
            </strong>
            <strong>
              <SettingsTwoTone />
              {$`Mas`}
            </strong>
          </div>
          <List height={272} itemSize={68} width='100%' itemCount={products.length}>
            {row}
          </List>
        </TableContainer>
      </div>
      <PopperMenuList
        placement='bottom-end'
        onClose={closeRowMenu}
        anchorEl={currentRow}
        open={openRowMenu}>
        <MenuItem>
          <Button fullWidth variant='outlined' startIcon={<CreateTwoTone />}>
            {$`Editar`}
          </Button>
        </MenuItem>
        <MenuItem>
          <Button fullWidth variant='outlined' startIcon={<DeleteTwoTone />}>
            {$`Borrar`}
          </Button>
        </MenuItem>
      </PopperMenuList>
    </>
  )
})

export default ProductsList
