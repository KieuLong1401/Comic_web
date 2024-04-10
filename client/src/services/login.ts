import axiosInstance from '@/utils/axiosInstance'

const login = async (data) => {
    const res = await axiosInstance({
        url: '/login',
        method: 'POST',
        data,
    })

    return res
}

export default login
