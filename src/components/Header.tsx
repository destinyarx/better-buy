'use client'

import Link from 'next/link';
import { useState } from 'react'

import ShoppingListModal from '@/components/ShoppingListModal'
import { Button } from '@/components/ui/button';
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
        <div className="flex justify-between p-4">
          <h1 className="text-3xl font-bold">BetterBuy</h1>

          <nav className="flex gap-6">
            <div 
              onClick={() => setShowModal(!showModal)} 
              className='flex flex-row items-center relative w-fit'
            >
              <div>
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
