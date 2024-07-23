'use client'

import { useState } from 'react'
import React, { useEffect } from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Uploader from "@/components/ui/uploader";


export default function Page() {

    return (
        <main>
            <h1 className="text-3xl font-bold underline">
                Upload a File to S3
            </h1>

            <Uploader/>
        </main>
    )
}

