'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import React from 'react'

type Props = {
    FirstTitle: string,
    SecondTitle: string
    FirstTab: React.ReactNode,
    SecondTab: React.ReactNode,
}

const TabSwitcher = (props: Props) => {
    return (
        <Tabs className='max-w-[500px]' defaultValue='sign-in'>
            <TabsList>
                <TabsTrigger value='sign-in'>{props.FirstTitle}</TabsTrigger>
                <TabsTrigger value='sign-up'>{props.SecondTitle}</TabsTrigger>
            </TabsList>

            <TabsContent value='sign-in'>{props.FirstTab}</TabsContent>
            <TabsContent value='sign-up'>{props.SecondTab}</TabsContent>
        </Tabs>
    )
}

export default TabSwitcher