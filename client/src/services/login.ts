import axiosInstance from '@/utils/axiosInstance'

const login = async (data) => {
    try {
        const res = await axiosInstance({
            url: '/login',
            method: 'POST',
            data,
        })

        return res.data.token
    } catch (err) {
        console.error(err)
    }
}

export default login
