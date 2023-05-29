import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';

import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}
  @ApiOperation({ summary: 'Get subscriptions by user id' })
  @UseGuards(AuthGuard)
  @Get(':userId')
  getSubscriptions(@Param('userId', ParseIntPipe) userId: number) {
    return this.subscriptionsService.getSubscriptions(userId);
  }

  @ApiOperation({ summary: 'Get subscribers by user id' })
  @UseGuards(AuthGuard)
  @Get('subscribers/:userId')
  getSubscribers(@Param('userId', ParseIntPipe) userId: number) {
    return this.subscriptionsService.getSubscribers(userId);
  }

  @ApiOperation({ summary: 'Create subscribtion' })
  @UseGuards(AuthGuard)
  @Post()
  subscribe(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.subscribe(createSubscriptionDto);
  }

  @ApiOperation({ summary: 'Delete subscribtion by subscription id' })
  @UseGuards(AuthGuard)
  @Delete('')
  unsubscribe(@Body() dto: CreateSubscriptionDto) {
    return this.subscriptionsService.unsubscribe(dto);
  }
}
