import { Product } from '@/types/types'
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react';


export default function ResultModal(
    { 
        products,
        isModalOpen, 
        setIsModalOpen 
    }: 
    {
        products: Product[], 
        isModalOpen: boolean,
        setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) {


    const saveToHistory = () => {

    }

    return (
        <Dialog 
            open={isModalOpen} 
            onOpenChange={setIsModalOpen}
        >
            <DialogContent className="w-[85vw] min-w-[55rem] max-w-5xl max-h-[85vh] left-1/2 top-[5%] -translate-x-1/2 translate-y-0 overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        <div className="text-2xl">
                            Best Value Product
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="font-black">
                    {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between border p-2 rounded">
                            <span>{product.title}</span>
                            <span>
                                {product.quantity ?? 0} {product.unitMeasurement ?? ""}
                            </span>
                            <span>
                                {product.price !== undefined ? `$${product.price}` : "N/A"}
                            </span>
                        </div>
                    ))}
                </div>


                <div className="flex justify-end">
                <Button type="button" variant="outline" onClick={saveToHistory} className="justify-start bg-green-500 text-white">
                    <Plus className="mr-2 h-4 w-4 text-white" />
                    Save in History
                </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}