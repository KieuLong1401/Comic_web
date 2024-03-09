import instance from '@/utils/axiosInstance'

export default async ({
    categories = [],
    sortBy = 'uploaded_time',
    sortType = 'desc',
    comicNumOfPage = 32,
    page,
}: {
    categories: string[]
    sortBy: string
    sortType: string
    comicNumOfPage: number
    page: number
}) => {
    try {
        const result = await instance({
            url: 'comicList',
            method: 'GET',
            params: {
                categories: JSON.stringify(categories),
                sortBy,
                sortType,
                comicNumOfPage,
                page,
            },
        })
        return result
    } catch (err) {
        console.error(err)
    }
}
