import { ForwardedRef, HTMLAttributes, forwardRef } from "react";

const BaseCard = forwardRef(({
  children,
  ...attrs
}: HTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  return (
    <div className='flex justify-center'>
      <div
        {...attrs}
        style={{
          border: '1px dashed rgb(226 228 233 / 1)',
          boxShadow: '0px 4px 7px 0px #00000008',
          ...attrs.style
        }}
      >
        <div ref={ref}>
          {children}
        </div>
      </div>
    </div>
  )
})

export default BaseCard