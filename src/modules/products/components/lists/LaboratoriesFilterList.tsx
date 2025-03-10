import React from 'react'
import { ILaboratory } from '../../interface/laboratiry-interface'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface LaboratoryListFilterProps {
    laboratories: ILaboratory[],
    isLoading: boolean,
}

export default function LaboratoryListFilter({
    laboratories,
    isLoading,
}: LaboratoryListFilterProps) {
    const isShowLoading = !laboratories && isLoading;

    return (
        <div>
            <h3 className="mb-3 font-medium">Marcas</h3>
            <div className="space-y-2">
                {!isShowLoading && (
                    laboratories.map((laboratory) => (
                        <div key={laboratory.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox id={`laboratory-${laboratory.id}`} />
                                <Label htmlFor={`laboratory-${laboratory.id}`} className="text-sm">
                                    {laboratory.name}
                                </Label>
                            </div>
                        </div>
                    ))
                )}
                {/* SHOW LOADING */}
            </div>
        </div>
    )
}
