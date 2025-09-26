'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface GridItem {
  id: string
  title: string
  imageUrl: string
  expandedContent?: string
}

interface ExpandableGridProps {
  items: GridItem[]
}

interface ExpandableButtonProps {
  item: GridItem
  isExpanded: boolean
  onToggle: () => void
}

function ExpandableButton({ item, isExpanded, onToggle }: ExpandableButtonProps) {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      className={`
        w-full h-full p-4 
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        hover:shadow-lg
        ${isExpanded 
          ? 'flex-row justify-start gap-6 text-left h-32' 
          : 'flex-col aspect-square h-48'
        }
      `}
    >
      <div className={`
        ${isExpanded 
          ? 'flex-1 text-left order-2'
          : 'text-center order-1'
        }
      `}>
        <h3 className={`
          font-semibold 
          ${isExpanded 
            ? 'text-xl mb-2' 
            : 'text-lg'
          }
        `}>
          {item.title}
        </h3>
        
        {isExpanded && item.expandedContent && (
          <p className="text-sm text-muted-foreground">
            {item.expandedContent}
          </p>
        )}
      </div>
      
      <div className={`
        relative bg-black 
        ${isExpanded 
          ? 'w-20 h-20 flex-shrink-0 order-1'
          : 'w-24 h-24 mb-3 order-2'
        }
        transition-[width,height] duration-300 ease-in-out
      `}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover rounded"
        />
      </div>
    </Button>
  )
}

export function ExpandableGrid({ items }: ExpandableGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
      {items.map((item) => (
        <div
          key={item.id}
          className={`
            ${expandedId === item.id ? 'md:col-span-3' : 'md:col-span-1'}
            transition-all duration-300 ease-in-out
          `}
        >
          <ExpandableButton
            item={item}
            isExpanded={expandedId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        </div>
      ))}
    </div>
  )
}