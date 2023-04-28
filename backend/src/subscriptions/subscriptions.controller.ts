import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}
  @ApiOperation({ summary: 'Get subscriptions by user id' })
  @UseGuards(AuthGuard)
  @Get(':userId')
  getSubscriptions(@Param('userId') userId: number) {
    return this.subscriptionsService.getSubscriptions(userId);
  }

  @ApiOperation({ summary: 'Get subscribers by user id' })
  @UseGuards(AuthGuard)
  @Get('subscribers/:userId')
  getSubscribers(@Param('userId') userId: number) {
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
  @Delete(':id')
  unsubscribe(@Param('id') id: number) {
    return this.subscriptionsService.unsubscribe(id);
  }
}
