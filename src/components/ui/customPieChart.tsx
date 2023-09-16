"use client"

import { getPieColor } from "@/lib/getPieColors"
import { animated, useSpring } from "@react-spring/web"
import { useTheme } from "next-themes"
import React, { FC, useState } from "react"
import { PieChart } from "react-minimal-pie-chart"

export const CustomPieChart: FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [valueCorrect, setValueCorrect] = useState(75)
  const valueIncorrect = 100 - valueCorrect

  const [props, api] = useSpring(() => ({
    from: { number: 0 },
    number: valueCorrect,
    delay: 200,
    config: {
      tension: 30,
      friciton: 1,
      duration: 1500,
      mass: 1,
    },
  }))

  const pieData = [
    {
      title: "Correct",
      value: valueCorrect,
      color: getPieColor(valueCorrect, isDark),
    },
    { title: "Incorrect", value: valueIncorrect, color: "transparent" },
  ]

  function handleClick() {}
  return (
    <div className="relative">
      {/* TODO: this is for dev. remove later */}
      {/* <Slider
        defaultValue={[valueCorrect]}
        className='mb-4'
        max={100}
        step={1}
        onValueChange={(e) => {
          setValueCorrect(e[0])
          api.start({
            number: e[0],
          })
        }}
      /> */}
      <PieChart
        rounded={valueCorrect > 3 ? true : false}
        animate={true}
        startAngle={270}
        data={pieData}
        background={isDark ? "#1F2937" : "#F3F4F6"}
        animationEasing="cubic-bezier(.41,.34,.3,.87)"
        animationDuration={1200}
        lineWidth={20}
      />
      <animated.div
        onClick={handleClick}
        className="absolute left-[53%] top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl font-bold "
      >
        {props.number.to((n) => n.toFixed(0) + "%")}
      </animated.div>
    </div>
  )
}

import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
