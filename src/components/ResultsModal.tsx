import { useRef } from 'react'
import Image from 'next/image';
import { Product, UnitType, Currency } from '@/types/types'
import { formatMoney } from '@/utils/format';
import { DEFAULT_UNIT_MEASUREMENT, UNIT_ICON } from '@/constants/units'

import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Plus } from 'lucide-react';


export default function ResultModal(
    { 
        products,
        unit,
        currency,
        isModalOpen, 
        setIsModalOpen 
    }: 
    {
        products: Product[], 
        unit: UnitType,
        currency: Currency,
        isModalOpen: boolean,
        setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) {

    const prev = useRef(isModalOpen);
    const hasMounted = useRef(false);

    const prices  = products.map(p => p.basePrice).filter(p => Number.isFinite(p) && p > 0);
    const sorted = [...prices].sort((a, b) => a - b);
    const lowest = sorted[0];
    const secondLowest = sorted[1];
    const highest = sorted[sorted.length - 1];

    const percentage = (price: number, base: number) => 
        Math.round(((base - price) / base) * 100 * 100) / 100;
    
    const lowestPct = percentage(secondLowest, highest); 
    const highestPct = percentage(lowest, highest); 

    console.log('secondLowest')
    console.log(secondLowest)

   
    // TODO: add persistent state management for shopping list
    const addToCart = () => [

    ]

    return (
        <Dialog 
            open={isModalOpen} 
            onOpenChange={setIsModalOpen}
        >
            <DialogContent className="w-[85vw] min-w-[70rem] max-w-7xl max-h-[85vh] left-1/2 top-[5%] -translate-x-1/2 translate-y-0 overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        <div className="text-3xl">
                            Best Value Product
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="font-black dark:text-zinc-50">
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-3 my-4">
                        {products.map((product, index) => (
                            <Card key="product.id">
                                <CardHeader>
                                     {lowest === product.basePrice && (
                                        <CardTitle>
                                            <Image
                                                src="/best-price.png"
                                                alt="Water Bottle Logo"
                                                width={60}             
                                                height={60}
                                                className="rounded-lg -mt-5"
                                                priority               
                                            />
                                        </CardTitle>
                                    )}

                                    <CardAction>
                                        {lowest === product.basePrice && lowestPct !== highestPct ? (
                                            <Badge variant="outline" className="bg-green-400">
                                                {`${lowestPct}% - ${highestPct}%`}
                                            </Badge>
                                        ) : lowest === product.basePrice ? (
                                            <Badge variant="outline" className="bg-green-400">
                                                {`${highestPct}%`}
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-red-400">
                                                -{percentage(lowest, product.basePrice)}%
                                            </Badge>
                                        )}
                                    </CardAction>
                                </CardHeader>
                                <CardContent>
                                    <div className={`text-9xl ${lowest === product.basePrice ? "-mt-5" : ""}`}>
                                        {UNIT_ICON[unit][index%6]}
                                    </div>

                                    <div className="flex justify-center text-xl mt-1">
                                        {product.title}
                                    </div>

                                    <div className="flex flex-row justify-between text-[1.6rem] text-gray-500">
                                        <div>
                                            {formatMoney(product.price, currency)}
                                        </div>

                                        <div>
                                             {`${product.quantity}/${(DEFAULT_UNIT_MEASUREMENT[unit])}`}
                                        </div>
                                    </div>

                                    <div className="flex justify-center font-semibold mt-2 italic">
                                        <div>
                                            {`Unit Price: ${formatMoney(product.basePrice, currency)}/${(DEFAULT_UNIT_MEASUREMENT[unit])}`}
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex justify-center">
                                    <div>
                                        <Button type="button" variant="outline" onClick={addToCart} className="justify-start bg-green-500 text-white">
                                            <Plus className="h-4 w-4 text-white" />
                                            Add to List
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}