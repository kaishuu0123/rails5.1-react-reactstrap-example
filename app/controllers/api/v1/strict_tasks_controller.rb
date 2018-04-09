class Api::V1::StrictTasksController < Api::V1::Base::ApplicationController
  before_action :authenticate!
  before_action :set_task, only: [
    :show, :update, :destroy
  ]

  def index
    render json: StrictTask.order(created_at: :desc).all
  end

  def create
    @task = StrictTask.create!(task_params)
    render json: @task
  end

  def show
    render json: @task
  end

  def update
    @task.update(task_params)
    render json: @task
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def task_params
    params.permit(:title, :description)
  end

  def set_task
    @task = StrictTask.find(params[:id])
  end
end