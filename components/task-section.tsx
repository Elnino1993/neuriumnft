"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Twitter, MessageCircle, Users, Send, ExternalLink, CheckCircle2 } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  url: string
  icon: React.ElementType
  reward: number
  completed: boolean
}

const tasks: Task[] = [
  {
    id: "follow",
    title: "Follow on Twitter",
    description: "Follow our official Twitter account",
    url: "https://x.com/OxVentura",
    icon: Twitter,
    reward: 100,
    completed: false,
  },
  {
    id: "retweet",
    title: "Retweet Launch Post",
    description: "Retweet our launch announcement",
    url: "https://x.com/OxVentura/status/2010461727570407519",
    icon: Twitter,
    reward: 150,
    completed: false,
  },
  {
    id: "comment",
    title: "Comment on Post",
    description: "Leave a meaningful comment on our post",
    url: "https://x.com/OxVentura/status/2010461727570407519",
    icon: MessageCircle,
    reward: 200,
    completed: false,
  },
  {
    id: "tag",
    title: "Tag 3 Friends",
    description: "Tag 3 friends in our launch post",
    url: "https://x.com/OxVentura/status/2010461727570407519",
    icon: Users,
    reward: 250,
    completed: false,
  },
  {
    id: "telegram",
    title: "Join Telegram",
    description: "Join our official Telegram community",
    url: "https://t.me/OxVentura",
    icon: Send,
    reward: 100,
    completed: false,
  },
]

export function TaskSection() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

  const handleTaskClick = (task: Task) => {
    window.open(task.url, "_blank", "noopener,noreferrer")
    // Mark task as completed after clicking
    setCompletedTasks((prev) => new Set([...prev, task.id]))
  }

  const earnedRewards = tasks.filter((task) => completedTasks.has(task.id)).reduce((sum, task) => sum + task.reward, 0)

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
            Earn Rewards
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Earn <span className="text-primary">$Task</span>
          </h1>
          <p className="text-xl text-muted-foreground">Complete social tasks to earn Task tokens</p>
        </div>

        {/* Progress */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="py-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Your Progress</span>
              <span className="text-sm font-medium">
                {completedTasks.size}/{tasks.length} tasks completed
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(completedTasks.size / tasks.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Earned Rewards</span>
              <span className="text-2xl font-bold text-primary">{earnedRewards} $Task</span>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => {
            const Icon = task.icon
            const isCompleted = completedTasks.has(task.id)

            return (
              <Card
                key={task.id}
                className={`transition-all duration-300 hover:border-primary/50 ${
                  isCompleted ? "border-primary/30 bg-primary/5" : ""
                }`}
              >
                <CardContent className="py-5">
                  <div className="flex items-center gap-4">
                    {/* Status Icon */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>

                    {/* Task Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>

                    {/* Reward */}
                    <div className="text-right mr-4">
                      <span className="text-lg font-bold text-primary">+{task.reward}</span>
                      <p className="text-xs text-muted-foreground">$Task</p>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => handleTaskClick(task)}
                      variant={isCompleted ? "outline" : "default"}
                      className="gap-2 flex-shrink-0"
                    >
                      {isCompleted ? "Done" : "Go"}
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
