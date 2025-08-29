'use client'

import { useState } from 'react'
import Image from 'next/image';


import ShoppingListModal from '@/components/ShoppingListModal'
import { ShoppingCartIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

import { useProductStore } from '@/stores/productStore'

export default function Header() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const products = useProductStore((s) => s.products)
  const productQuantity = products.length

  return (
    <>
      <header className="w-full border-b bg-white dark:bg-gray-900 dark:text-zinc-50 shadow-sm">
        <div className="flex justify-between p-2">


          <div className="w-fit flex items-center gap-3 rounded-2xl bg-slate-800 p-1 sm:p-4 shadow overflow-hidden -mt-1">
            <div className="relative h-10 w-14 shrink-0">
              <Image
                src="/better-buy-logo.png"
                alt="Water Bottle Logo"
                width={80}             
                height={80}
                className="rounded-lg object-cover -mt-2"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold text-white">BetterBuy</h1>
          </div>


          <nav className="flex gap-6 mr-2 mt-2">
            <div 
              onClick={() => setShowModal(!showModal)} 
              className='flex flex-row items-center relative w-fit h-fit'
            >
              <div className="text-xl font-semibold mr-1">
                Shopping List
              </div>

              <Avatar className='size-9 rounded-sm'>
                  <AvatarFallback className='rounded-sm'>
                    <ShoppingCartIcon className='size-5' />
                  </AvatarFallback>
              </Avatar>
              <Badge className='absolute -end-2.5 -top-2.5 h-5 min-w-5 rounded-full px-1 tabular-nums'>
                {productQuantity ?? ''}
              </Badge>
            </div>
          </nav>
        </div>
      </header>

      <ShoppingListModal 
        showModal={showModal} 
        setShowModal={setShowModal}
      />
    </>
  );
}
