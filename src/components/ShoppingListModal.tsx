import { useState, useEffect, useMemo } from 'react'
import { useProductStore } from '@/stores/productStore'
import { formatMoney, formatDate } from '@/utils/format'


import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { UNIT_ICON } from "@/constants/units"
import { Trash2 } from 'lucide-react';

export default function ShoppingList({
        showModal, 
        setShowModal
    }: {
        showModal: boolean,
        setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    }) 
{

    // store
    const products = useProductStore((s) => s.products)
    const deleteProduct = useProductStore((s) => s.deleteProduct)
    const clearProduct = useProductStore((s) => s.clear) 

    // datatable
    const PAGE_SIZE = 10
    const [page, setPage] = useState(0)

    const pageCount = Math.max(1, Math.ceil(products.length / PAGE_SIZE))
    const start = (page - 1) * PAGE_SIZE
    const current = useMemo(() => {
        const start = page * PAGE_SIZE
        const end = start + PAGE_SIZE
        return products.slice(start, end)
    }, [products, page])

    useEffect(() => {
        if (page > pageCount) setPage(pageCount)
    }, [page, pageCount, products.length])

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="w-[85vw] min-w-[70rem] max-w-7xl max-h-[85vh] left-1/2 top-[5%] -translate-x-1/2 translate-y-0 overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        <div className="text-2xl">Shopping List</div>
                    </DialogTitle>
                    <DialogDescription className="-mt-2">
                        Manage the items you plan to buy.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end -mt-5">
                    <Button onClick={() => clearProduct()} variant="destructive">
                        Clear All
                    </Button>
                </div>

                <div className="space-y-3">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead className="text-center">Price</TableHead>
                                    <TableHead className="text-center">Qty</TableHead>
                                    <TableHead className="text-center">Created</TableHead>
                                    <TableHead className="text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {current.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                            No items
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                current.map((product) => (
                                    <TableRow key={`${product.id}-${product.createdAt}`}>
                                        <TableCell className="font-medium">
                                            <span className="text-[2.5rem] mr-2">
                                                {UNIT_ICON?.[product.unit]?.[product.id % 6]}
                                            </span>
                                            {product.title}
                                        </TableCell>

                                        <TableCell className="text-center">{product.price}</TableCell>

                                        <TableCell className="text-center">
                                            {`${product.quantity}/${product.unitMeasurement}`}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {formatDate(product.createdAt)}
                                        </TableCell>

                                        <TableCell className="text-center">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteProduct(product.createdAt)}
                                        >
                                            <Trash2 className="h-10 w-10 text-red-600" />
                                        </Button>
                                            
                                        </TableCell>
                                    </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination controls */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            {products.length > 0
                                ? `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, products.length)} of ${products.length}`
                                : `No results`}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setPage(1)} disabled={page === 1}>
                                ⏮
                            </Button>

                            <Button variant="outline" size="sm" onClick={() => setPage((p) => p-1)} disabled={page === 0}>
                                Previous
                            </Button>

                            <span className="text-sm tabular-nums">
                                Page {page} / {pageCount}
                            </span>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                                disabled={page === pageCount}
                            >
                                Next
                            </Button>

                            <Button variant="outline" size="sm" onClick={() => setPage(pageCount)} disabled={page === pageCount}>
                                ⏭
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}