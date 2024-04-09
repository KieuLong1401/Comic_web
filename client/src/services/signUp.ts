import axiosInstance from '@/utils/axiosInstance'

const signUp = async (data) => {
    try {
        const result = await axiosInstance({
            url: '/signup',
            method: 'POST',
            data,
        })
        return result.data
    } catch (err) {
        console.error(err)
    }
}

export default signUp
