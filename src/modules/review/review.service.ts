import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) { }

  async create(createReviewDto: CreateReviewDto) {
    const reviewData = await this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(reviewData);
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOne(uid: number): Promise<ReviewEntity> {
    const reviewData =
      await this.reviewRepository.findOneBy({ uid });
    if (!reviewData) {
      throw new HttpException(
        'Review Not Found',
        404,
      );
    }
    return reviewData;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const existingReview = await this.findOne(id);
    const reviewData = this.reviewRepository.merge(
      existingReview,
      updateReviewDto,
    );
    return await this.reviewRepository.save(
      reviewData,
    );
  }

  async remove(id: number) {
    const existingReview = await this.findOne(id);
    return await this.reviewRepository.remove(
      existingReview,
    );
  }
}
