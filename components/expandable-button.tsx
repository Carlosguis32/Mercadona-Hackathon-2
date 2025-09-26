'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface ExpandableButtonProps {
  title: string
  imageUrl: string
  expandedContent?: string
  onExpand?: () => void // pass a function to expandable button
}

export function ExpandableButton({ 
  title, 
  imageUrl, 
  expandedContent = "Additional content goes here", 
  onExpand 
}: ExpandableButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    setIsExpanded(!isExpanded)
    onExpand?.()
  }

  return (
    <div 
      className={`
        transition-all duration-300 ease-in-out
        ${isExpanded 
          ? 'col-span-full h-32' 
          : 'aspect-square h-48'
        }
      `}
    >
      <Button
        onClick={handleClick}
        variant="outline"
        className={`
          w-full h-full p-4 
          flex flex-col items-center justify-center
          transition-all duration-300 ease-in-out
          hover:shadow-lg
          ${isExpanded 
            ? 'flex-row justify-start gap-6 text-left' 
            : 'flex-col'
          }
        `}
      >
        <div className={`
          relative 
          ${isExpanded 
            ? 'w-20 h-20 flex-shrink-0' 
            : 'w-24 h-24 mb-3'
          }
          transition-all duration-300 ease-in-out
        `}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded"
          />
        </div>
        
        <div className={`
          ${isExpanded 
            ? 'flex-1 text-left' 
            : 'text-center'
          }
        `}>
          <h3 className={`
            font-semibold 
            ${isExpanded 
              ? 'text-xl mb-2' 
              : 'text-lg'
            }
          `}>
            {title}
          </h3>
          
          {isExpanded && (
            <p className="text-sm text-muted-foreground">
              {expandedContent}
            </p>
          )}
        </div>
      </Button>
    </div>
  )
}