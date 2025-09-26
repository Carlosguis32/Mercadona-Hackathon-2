'use client'

import { useState } from 'react'
import { ExpandableButton } from './expandable-button'

interface GridItem {
  id: string
  title: string
  imageUrl: string
  expandedContent?: string
}

interface ExpandableGridProps {
  items: GridItem[]
}

export function ExpandableGrid({ items }: ExpandableGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleExpand = (id: string) => {
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
            title={item.title}
            imageUrl={item.imageUrl}
            expandedContent={item.expandedContent}
            onExpand={() => handleExpand(item.id)}
          />
        </div>
      ))}
    </div>
  )
}