import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "./ui/pagination";

interface ChangePagesProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
}

export default function ChangePages({
    currentPage,
    setCurrentPage,
    totalItems,
    itemsPerPage
}: ChangePagesProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="py-12 mb-4">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={"#"}
                            onClick={(e) => {
                                if (currentPage > 1) {
                                    setCurrentPage(
                                        Math.max(currentPage - 1, 1)
                                    );
                                } else {
                                    e.preventDefault();
                                }
                            }}
                            // aria-disabled={currentPage === 1}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index + 1}>
                            <PaginationLink
                                href="#"
                                onClick={() => setCurrentPage(index + 1)}
                                className={
                                    currentPage === index + 1 ? "font-bold" : ""
                                }
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href={"#"}
                            onClick={(e) => {
                                if (currentPage < totalPages) {
                                    setCurrentPage(
                                        Math.min(currentPage + 1, totalPages)
                                    );
                                } else {
                                    e.preventDefault();
                                }
                            }}
                            className=""
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
