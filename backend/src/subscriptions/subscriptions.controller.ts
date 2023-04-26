import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './create-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}
  @ApiOperation({ summary: 'Get subscriptions by user id' })
  @Get(':userId')
  getSubscriptions(@Param('userId') userId: number) {
    return this.subscriptionsService.getSubscriptions(userId);
  }

  @ApiOperation({ summary: 'Get subscribers by user id' })
  @Get('subscribers/:userId')
  getSubscribers(@Param('userId') userId: number) {
    return this.subscriptionsService.getSubscribers(userId);
  }

  @ApiOperation({ summary: 'Create subscribtion' })
  @Post()
  subscribe(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.subscribe(createSubscriptionDto);
  }

  @ApiOperation({ summary: 'Delete subscribtion by subscription id' })
  @Delete(':id')
  unsubscribe(@Param('id') id: number) {
    return this.subscriptionsService.unsubscribe(id);
  }
}
