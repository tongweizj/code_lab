export const useFoo = () => {
  return useState('foo', () => '我是 composables 下的函数 useFoo')
}

