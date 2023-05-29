import {  User } from '~/types'
const useUserData = () => {
  const userData = useState<User[]>('user', () => [])
  
  const setUserData = (data: User) => {
    userData.value.push(data)
    console.log('data:',data.about)
  }
  return {
    userData,
    setUserData
  }
}
export default useUserData