import { generateProperties } from '@/components/adi/mod/base/base.utils'
import mod from '@/components/adi/mod/base/Base'
import styles from './mix_position.styles'

const name = 'ModMixPosition'

const components = {
  button: 'AdiButton'
}

const properties = generateProperties(name, components)

export default { mod, name, properties, styles }
