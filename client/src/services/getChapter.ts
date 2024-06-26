import axiosInstance from '@/utils/axiosInstance'

export default async (comicId: string, limit?: number) => {
    try {
        const res = await axiosInstance({
            url: `chapter/${comicId}`,
            method: 'GET',
            params: {
                limit,
            },
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}
