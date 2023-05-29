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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';

import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}
  @ApiOperation({ summary: 'Get subscriptions by user id' })
  @ApiResponse({ status: 200, type: Array<Subscription> })
  @UseGuards(AuthGuard)
  @Get(':userId')
  getSubscriptions(@Param('userId', ParseIntPipe) userId: number) {
    return this.subscriptionsService.getSubscriptions(userId);
  }

  @ApiOperation({ summary: 'Get subscribers by user id' })
  @ApiResponse({ status: 200, type: Array<Subscription> })
  @UseGuards(AuthGuard)
  @Get('subscribers/:userId')
  getSubscribers(@Param('userId', ParseIntPipe) userId: number) {
    return this.subscriptionsService.getSubscribers(userId);
  }

  @ApiOperation({ summary: 'Create subscription' })
  @ApiResponse({ status: 201, type: Subscription })
  @UseGuards(AuthGuard)
  @Post()
  subscribe(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.subscribe(createSubscriptionDto);
  }

  @ApiOperation({ summary: 'Delete subscription by subscription id' })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(AuthGuard)
  @Delete('')
  unsubscribe(@Body() dto: CreateSubscriptionDto) {
    return this.subscriptionsService.unsubscribe(dto);
  }
}
