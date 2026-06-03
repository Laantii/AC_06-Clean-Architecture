import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { CreateCommentDto } from "./comments.dtos"
import { CommentsService } from "./comments.service"

@Controller("api/posts/:id/comments")
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Get()
    list(@Param("id") postId: string) {
        return this.commentsService.listByPostId(postId)
    }

    @Post()
    create(@Param("id") postId: string, @Body() body: CreateCommentDto) {
        return this.commentsService.create(postId, body)
    }
}