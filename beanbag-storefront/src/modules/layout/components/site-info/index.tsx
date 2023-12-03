import { Disclosure } from "@headlessui/react"
// import clsx from "clsx"
import React from "react"

const InfoContainer: React.FC<{ label: string }> = ({ label, children }) => {
  return (
    <div>
      <div>
        <span>{label}</span>
        {children}
      </div>
      <div>
        <Collapsible label={label}>{children}</Collapsible>
      </div>
    </div>
  )
}

const Collapsible: React.FC<{ label: string }> = ({ label, children }) => {
  return (
    <div>
      <Disclosure>
        {({ open }) => {
          return (
            <>
              <Disclosure.Button>
                <span>{label}</span>
                <AnimatedButton open={open} />
              </Disclosure.Button>
              <Disclosure.Panel
                static
                // className={clsx(
                //   "transition-[max-height,opacity] duration-700 ease-in-out overflow-hidden",
                //   {
                //     "max-h-[300px] opacity-100": open,
                //     "max-h-0 opacity-0": !open,
                //   }
                // )}
              >
                <div>
                  <span>{children}</span>
                </div>
              </Disclosure.Panel>
            </>
          )
        }}
      </Disclosure>
    </div>
  )
}

const AnimatedButton = ({ open }: { open: boolean }) => {
  return (
    <div>
      <div />
      <div
      // className={clsx(
      //   "bg-gray-900 absolute left-[7px] inset-y-0 w-px transition-all duration-300 ease-out",
      //   { "rotate-90": open }
      // )}
      />
    </div>
  )
}
