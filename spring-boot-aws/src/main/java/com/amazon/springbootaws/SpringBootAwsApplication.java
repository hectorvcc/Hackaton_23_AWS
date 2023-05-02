package com.amazon.springbootaws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.Bucket;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class SpringBootAwsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootAwsApplication.class, args);


		final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion("eu-south-2").build();
		// Listing all the buckets
		List<Bucket> buckets = s3.listBuckets();
		// Iterating through the bucket
		buckets.stream().forEach(bucket -> {
			System.out.println("Bucket Name:" + bucket.getName() + ", Bucket Owner" + bucket.getOwner().getDisplayName()
					+ ", Bucket Creation Date :" + bucket.getCreationDate());
		});
	}
}
