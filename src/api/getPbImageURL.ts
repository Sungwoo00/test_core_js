import { Item } from '../@types/type';

export function getPbImageURL(item: Item, fileName = 'photo') {
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}

// function getPbImagaeUral<K extends keyof Item>(item: Item, fileName = 'photo' as K) {
//   return `http://127.0.0.1:8090/api/files/${item.collectionId}/${item.id}/${item[fileName]}}`;
// }
