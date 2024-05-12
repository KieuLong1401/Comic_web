import axiosInstance from '@/utils/axiosInstance'

export default async (chapterId: number) => {
    try {
        const res = await axiosInstance({
            url: 'image',
            method: 'GET',
            params: {
                chapterId: chapterId,
            },
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}
