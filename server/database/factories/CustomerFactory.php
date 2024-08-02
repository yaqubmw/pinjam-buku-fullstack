<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Customer;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Customer::class;

    public function definition(): array
    {
        return [
            'membership_number' => $this->faker->ean8(),
            'name' => $this->faker->name(),
            'birth_date' => $this->faker->date($format='Y-m-d', $min='-15 years', $max='-30 years'),
        ];
    }
}
