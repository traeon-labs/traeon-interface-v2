export type INFTMetadata = {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
}
export type ITabs = 'mdi:location-on-outline' | 'akar-icons:thunder' | 'iconamoon:certificate-badge'  | 'mdi:shopping-outline'