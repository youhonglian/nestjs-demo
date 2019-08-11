import { Controller, Get, Req, Query, Headers, Param,
  Body, Post, HttpStatus, HttpException, ForbiddenException,
  UseFilters, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from 'src/core/filters/demo.filter';
import { DemoAuthGuard } from 'src/core/guard/demo-auth.guard';
import { Roles } from 'src/core/decorator/roles.decorator';

@Controller('posts')
// @UseFilters(DemoFilter)
// @UseGuards(DemoAuthGuard)
export class PostsController {

  constructor(private readonly demoService: DemoService) {}

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id) {
    console.log('id', typeof id);

    return [
      {
        title: `post ${id}`,
      },
    ];
  }

  @Post()
  // @UseFilters(DemoFilter)
  @UsePipes(ValidationPipe)
  // @SetMetadata('roles', ['member'])
  @Roles('member')
  store(@Body() post: CreatePostDto) {
    // console.log(post);
    // throw new HttpException('No Authorization!', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException('Forbidden!');
    this.demoService.create(post);
  }
}
