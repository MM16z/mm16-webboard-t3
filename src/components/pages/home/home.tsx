'use client'

import { useState } from "react"
// import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { MessageCircle, ThumbsUp, User, LogOut, ChevronLeft, ChevronRight } from "lucide-react"

const POSTS_PER_PAGE = 6

export default function HomeSection() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPosts = 30 // This would typically come from your backend

    // const handleLogin = () => setIsLoggedIn(true)
    // const handleLogout = () => setIsLoggedIn(false)

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* <BackgroundText /> */}
            <main className="flex-1 container py-6">
                <div className="mb-6">
                    <Input placeholder="Search posts..." className="max-w-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: POSTS_PER_PAGE }, (_, i) => (
                        <PostCard key={i} />
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                />
            </main>
        </div>
    )
}

function Pagination({ currentPage, totalPages, onPrevPage, onNextPage }: {
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
}) {
    return (
        <div className="flex items-center justify-center space-x-6 mt-8">
            <Button
                variant="outline"
                size="sm"
                onClick={onPrevPage}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
            </Button>
            <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
            </span>
            <Button
                variant="outline"
                size="sm"
                onClick={onNextPage}
                disabled={currentPage === totalPages}
            >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
    )
}

function PostCard() {
    const comments = [
        {
            id: 1,
            username: "Alice",
            avatar: "/placeholder-avatar-1.jpg",
            title: "Great post!",
            content: "I really enjoyed reading this. Very insightful!",
            date: new Date(2023, 5, 15, 10, 30), // June 15, 2023, 10:30 AM
        },
        {
            id: 2,
            username: "Bob",
            avatar: "/placeholder-avatar-2.jpg",
            title: "Interesting perspective",
            content: "I hadn't thought about it that way before. Thanks for sharing!",
            date: new Date(2023, 5, 15, 11, 45), // June 15, 2023, 11:45 AM
        },
        {
            id: 3,
            username: "Charlie",
            avatar: "/placeholder-avatar-3.jpg",
            title: "Question",
            content: "Could you elaborate more on the third point? I'm not sure I fully understand.",
            date: new Date(2023, 5, 15, 14, 20), // June 15, 2023, 2:20 PM
        },
    ]

    return (
        <Card className="mb-4 break-inside-avoid">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold">Username</h3>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
            </CardHeader>
            <CardContent>
                <h4 className="font-bold mb-2">Post Title</h4>
                <p className="text-muted-foreground">
                    This is the content of the post. It can be a short description or a longer piece of text.
                </p>
            </CardContent>
            <CardFooter className="flex flex-col">
                <div className="flex justify-between w-full mb-4">
                    <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        <span>42 Likes</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        <span>{comments.length} Comments</span>
                    </Button>
                </div>
                <Separator className="mb-4" />
                <div className="w-full space-y-4">
                    {comments.slice(0, 3).map((comment) => (
                        <CommentComponent key={comment.id} {...comment} />
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}

function CommentComponent({ username, avatar, title, content, date }: {
    username?: string;
    avatar?: string;
    title?: string;
    content?: string;
    date?: Date;
}) {
    const getInitials = (name: string | undefined) => {
        if (!name) return '??';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const formatDate = (date: Date | undefined) => {
        if (!date) return 'Unknown date';
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="flex items-start space-x-4">
            <Avatar className="w-8 h-8">
                <AvatarImage src={avatar ?? ''} alt={username ?? 'Anonymous'} />
                <AvatarFallback>{getInitials(username ?? '')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <h5 className="text-sm font-semibold">{username ?? 'Anonymous'}</h5>
                    <p className="text-xs text-muted-foreground">{title ?? 'Untitled'}</p>
                </div>
                <p className="text-sm text-muted-foreground">{content ?? 'No content'}</p>
                <p className="text-xs text-muted-foreground">{formatDate(date)}</p>
            </div>
        </div>
    )
}