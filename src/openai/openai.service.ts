import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OpenAIApi,
  Configuration,
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from 'openai';

@Injectable()
export class OpenaiService {
  private openaiClient: OpenAIApi;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_SECRET_KEY');
    const configuration = new Configuration({ apiKey });
    this.openaiClient = new OpenAIApi(configuration);
  }

  async createChatCompletion(
    chat: ChatCompletionRequestMessage[],
  ): Promise<CreateChatCompletionResponse> {
    const response = await this.openaiClient.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: chat,
    });
    return response.data;
  }
}
