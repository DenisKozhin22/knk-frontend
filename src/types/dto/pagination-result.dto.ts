export interface PaginationResultDto<T> {
	data: T[]

	meta: {
		total: number

		lastPage: number

		currentPage: number

		totalPerPage: number

		prevPage: number | null

		nextPage: number | null
	}
}
