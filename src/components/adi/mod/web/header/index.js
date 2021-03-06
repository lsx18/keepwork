import { generateProperties } from '@/components/adi/mod/base/base.utils'
import mod from '@/components/adi/mod/base/Base'
import styles from './header.styles'

const name = 'ModHeader'

const components = {
  menu: 'AdiMenu',
  label: 'AdiLabel',
  media: 'AdiMedia'
}

const properties = generateProperties(name, components)

export default { mod, name, properties, styles }
