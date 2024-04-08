import axiosInstance from '@/utils/axiosInstance'

export default async (data) => {
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
