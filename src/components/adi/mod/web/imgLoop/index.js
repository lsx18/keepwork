import { generateProperties } from '@/components/adi/mod/base/base.utils'
import mod from '@/components/adi/mod/base/Base'
import styles from './imgLoop.styles'

const name = 'ModImgLoop'

const components = {
  imgLoop: 'AdiImgLoop'
}

const properties = generateProperties(name, components)

export default { mod, name, components, properties, styles }