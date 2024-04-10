import axiosInstance from '@/utils/axiosInstance'

const signUp = async (data) => {
    const res = await axiosInstance({
        url: '/signup',
        method: 'POST',
        data,
    })
    return res
}

export default signUp
