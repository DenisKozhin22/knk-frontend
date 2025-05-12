import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationLink,
	PaginationEllipsis
} from '@/components/ui/pagination'

interface PaginatorProps {
	total: number
	currentPage: number
	lastPage: number
	totalPerPage: number
	prevPage: number | null
	nextPage: number | null
	onPageChange: (page: number) => void
}

export const Paginator = ({
	// total,
	currentPage,
	lastPage,
	// totalPerPage,
	prevPage,
	nextPage,
	onPageChange
}: PaginatorProps) => {
	const handlePageClick = (page: number) => {
		if (page >= 1 && page <= lastPage) {
			onPageChange(page)
		}
	}

	const generatePageNumbers = () => {
		const pageNumbers: number[] = []
		if (lastPage <= 5) {
			for (let i = 1; i <= lastPage; i++) {
				pageNumbers.push(i)
			}
		} else {
			pageNumbers.push(1)
			if (currentPage > 3) pageNumbers.push(0)
			for (
				let i = Math.max(2, currentPage - 1);
				i <= Math.min(currentPage + 1, lastPage - 1);
				i++
			) {
				pageNumbers.push(i)
			}
			if (currentPage < lastPage - 2) pageNumbers.push(0)
			pageNumbers.push(lastPage)
		}
		return pageNumbers
	}

	const pageNumbers = generatePageNumbers()

	// Вычисляем элементы на текущей странице
	// const startItem = (currentPage - 1) * totalPerPage + 1
	// const endItem = Math.min(currentPage * totalPerPage, total)

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => handlePageClick(prevPage || currentPage)}
						isActive={currentPage != 1}
					/>
				</PaginationItem>

				{pageNumbers.map((page, index) => (
					<PaginationItem key={index}>
						{page === 0 ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink isActive={page === currentPage} onClick={() => handlePageClick(page)}>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						onClick={() => handlePageClick(nextPage || currentPage)}
						isActive={currentPage != lastPage}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
		// <div className='flex w-full justify-between items-center'>
		// 	{/* Отображаем количество элементов на текущей странице */}
		// 	<div className='text-sm text-gray-600'>
		// 		Показано {startItem} - {endItem} из {total} элементов
		// 	</div>

		// 	<Pagination className='w-max'>
		// 		<PaginationContent>
		// 			<PaginationItem>
		// 				<PaginationPrevious
		// 					onClick={() => handlePageClick(prevPage || currentPage)}
		// 					isActive={currentPage != 1}
		// 				/>
		// 			</PaginationItem>

		// 			{pageNumbers.map((page, index) => (
		// 				<PaginationItem key={index}>
		// 					{page === 0 ? (
		// 						<PaginationEllipsis />
		// 					) : (
		// 						<PaginationLink
		// 							href='#'
		// 							isActive={page === currentPage}
		// 							onClick={() => handlePageClick(page)}>
		// 							{page}
		// 						</PaginationLink>
		// 					)}
		// 				</PaginationItem>
		// 			))}

		// 			<PaginationItem>
		// 				<PaginationNext
		// 					onClick={() => handlePageClick(nextPage || currentPage)}
		// 					isActive={currentPage != lastPage}
		// 				/>
		// 			</PaginationItem>
		// 		</PaginationContent>
		// 	</Pagination>
		// </div>
	)
}
