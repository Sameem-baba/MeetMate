'use client'

import { useGetCalls } from '@/hooks/useGetCalls';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { toast } from './ui/use-toast';

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const [recordings, setRecordings] = useState<Call[]>([]);

    const router = useRouter();

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recordings;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'upcoming':
                return 'No Upcoming Calls';
            case 'recordings':
                return 'No Recordings';
            default:
                return '';
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))

                const recordings = callData
                    .filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings)

                //@ts-ignore
                setRecordings(recordings)
            } catch (err) {
                toast({
                    title: 'Try Again Later',
                })
            }

        }

        if (type === 'recordings') fetchRecordings();
    }, [type, callRecordings])

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    if (isLoading) return <Loader />

    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2 '>
            {calls && calls.length > 0 ? (
                calls.map((call: Call | CallRecording, index) => (
                    <MeetingCard

                        key={index}
                        icon={type === 'ended' ? '/icons/previous.svg' : type === 'upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg'}
                        title={(call as Call).state?.custom?.description?.substring(0, 20) || 'Personal Meeting'}
                        date={(call as Call).state?.startsAt?.toLocaleString() || (call as CallRecording).start_time.toLocaleString()}
                        isPreviousMeeting={type === 'ended' ? false : true}
                        buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                        handleClick={type === 'recordings' ? () => router.push(`${(call as CallRecording).url}`) : () => router.push(`/meeting/${(call as Call).id}`)}
                        link={type === 'recordings' ? (call as CallRecording).url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(call as Call).id}`}
                        buttonText={type === 'recordings' ? 'Play' : 'Start'}
                    />
                ))
            ) : (
                <h1>
                    {noCallsMessage}
                </h1>
            )}
        </div>
    )
}

export default CallList