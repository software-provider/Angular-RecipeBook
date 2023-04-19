using System;
using System.Net;
using System.Threading.Tasks;
using Application.Core.Exceptions;
using Application.Core.Exceptions.Constants;
using Application.Core.Exceptions.Models;
using Application.Core.Utilities.ContentTypes;
using Application.Core.Utilities.ContentTypes.Enums;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Application.Web.Core.Middlewares
{
    public class ApiExceptionHandlerMiddleware
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly RequestDelegate _next;

        private readonly ILogger<ApiExceptionHandlerMiddleware> _logger;

        public ApiExceptionHandlerMiddleware(IWebHostEnvironment webHostEnvironment, RequestDelegate next, ILogger<ApiExceptionHandlerMiddleware> logger)
        {
            _webHostEnvironment = webHostEnvironment;
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (ApiException ex)
            {
                _logger.LogWarning(ex, $"Exception Code: {(int)ex.ExceptionCode}");

                ApiErrorModel payload = new ApiErrorModel
                {
                    ExceptionCode = ex.ExceptionCode,
                    Message = ex.Message,
                    Exception = _webHostEnvironment.IsDevelopment() ? ex.ToString() : ApiErrorConstants.NON_DEVELOPMENT_EXCEPTION_MESSAGE
                };

                await WriteAsJsonAsync(httpContext, HttpStatusCode.BadRequest, payload);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                InternalServerErrorModel payload = new InternalServerErrorModel
                {
                    Message = ex.Message,
                    Exception = _webHostEnvironment.IsDevelopment() ? ex.ToString() : InternalServerErrorConstants.NON_DEVELOPMENT_EXCEPTION_MESSAGE
                };

                await WriteAsJsonAsync(httpContext, HttpStatusCode.InternalServerError, payload);
            }
        }

        private async Task WriteAsJsonAsync(HttpContext context, HttpStatusCode httpStatusCode, object payload, bool clearResponseBeforeWrite = true)
        {
            if (clearResponseBeforeWrite)
            {
                context.Response.Clear();
            }

            context.Response.StatusCode = (int)httpStatusCode;
            context.Response.ContentType = ContentTypes.GetContentType(ContentType.Json);

            string jsonText = JsonConvert.SerializeObject(payload);

            await context.Response.WriteAsync(jsonText);
        }
    }
}
