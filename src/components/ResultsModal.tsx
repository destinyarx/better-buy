import { Result } from '@/types/types'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function ResultModal(
    { 
        result, 
        setResult 
    }: 
    {
        result: Result, 
        setResult: React.Dispatch<React.SetStateAction<Result>>
    }) {
    return (
        <Dialog 
            open={result.isOpen} 
            onOpenChange={(open) => setResult({ ...result, isOpen: open })}
        >
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}