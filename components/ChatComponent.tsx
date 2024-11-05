
import React from 'react'
import { Badge } from './ui/badge'

type Props = {
    reportData : string
}

const ChatComponent = ({reportData}: Props) => {
  return (
    <div className='h-full bg-muted/50 relative flex flex-col min-h-[50vh] rounded-xl p-4 gap-4'>
        <Badge
            variant={'outline'}
            className={`absolute right-3 top-1.5 ${reportData ? 'bg-green-400' : 'bg-red-500'}`}
        >
            {reportData ? 'Report Added' : 'No Report Added'}
        </Badge>
        <div className='flex-1'>
            
        </div>
    </div>
  )
}

export default ChatComponent