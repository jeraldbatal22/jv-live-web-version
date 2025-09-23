import React from 'react'

interface JVLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const JVLogo: React.FC<JVLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer circle */}
        <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center relative">
          {/* J letter - gradient from blue to green */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* J curve with pink dot */}
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-pink-400"></div>
            <div className="w-0.5 h-5 bg-gradient-to-b from-blue-400 to-green-400 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-4 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
          </div>
          
          {/* V letter - green */}
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <div className="w-0.5 h-4 bg-green-400 rounded-full transform rotate-12 origin-bottom"></div>
            <div className="w-0.5 h-4 bg-green-400 rounded-full transform -rotate-12 origin-bottom"></div>
          </div>
        </div>
      </div>
      
      {/* Text below logo */}
      <div className="mt-3 text-center">
        <div className="text-white font-bold text-lg tracking-wider">JUST VIBING</div>
        <div className="text-white text-xs tracking-wider opacity-80">ENTERTAINMENT</div>
      </div>
    </div>
  )
}
