'use client'

import { JSX, useState } from 'react'
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
  columns?: number
  expandDirection?: 'above' | 'below'
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
          className="object-cover rounded transition-none"
        />
      </div>
    </Button>
  )
}

export function ExpandableGrid({ items, columns = 3, expandDirection = 'below' }: ExpandableGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const getRowItems = (itemIndex: number) => {
    const rowIndex = Math.floor(itemIndex / columns)
    const rowStart = rowIndex * columns
    const rowEnd = Math.min(rowStart + columns, items.length)
    return items.slice(rowStart, rowEnd)
  }

  const renderGrid = () => {
    const result: JSX.Element[] = []
    const processedRows = new Set<number>()

    items.forEach((item, index) => {
      const rowIndex = Math.floor(index / columns)
      
      if (processedRows.has(rowIndex)) return

      const rowItems = getRowItems(index)
      const expandedInRow = rowItems.find(rowItem => rowItem.id === expandedId)

      if (expandedInRow) {
        const otherItemsInRow = rowItems.filter(rowItem => rowItem.id !== expandedId)
        
        if (expandDirection === 'above') {
          if (otherItemsInRow.length > 0) {
            result.push(
              <div key={`above-${rowIndex}`} className="md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {otherItemsInRow.map((rowItem) => (
                    <ExpandableButton
                      key={rowItem.id}
                      item={rowItem}
                      isExpanded={false}
                      onToggle={() => handleToggle(rowItem.id)}
                    />
                  ))}
                </div>
              </div>
            )
          }

          result.push(
            <div key={`expanded-${rowIndex}`} className="md:col-span-3">
              <ExpandableButton
                item={expandedInRow}
                isExpanded={true}
                onToggle={() => handleToggle(expandedInRow.id)}
              />
            </div>
          )
        } else {
          result.push(
            <div key={`expanded-${rowIndex}`} className="md:col-span-3">
              <ExpandableButton
                item={expandedInRow}
                isExpanded={true}
                onToggle={() => handleToggle(expandedInRow.id)}
              />
            </div>
          )

          if (otherItemsInRow.length > 0) {
            result.push(
              <div key={`below-${rowIndex}`} className="md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {otherItemsInRow.map((rowItem) => (
                    <ExpandableButton
                      key={rowItem.id}
                      item={rowItem}
                      isExpanded={false}
                      onToggle={() => handleToggle(rowItem.id)}
                    />
                  ))}
                </div>
              </div>
            )
          }
        }
      } else {
        rowItems.forEach((rowItem) => {
          result.push(
            <div key={rowItem.id} className="md:col-span-1">
              <ExpandableButton
                item={rowItem}
                isExpanded={false}
                onToggle={() => handleToggle(rowItem.id)}
              />
            </div>
          )
        })
      }

      processedRows.add(rowIndex)
    })

    return result
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
      {renderGrid()}
    </div>
  )
}